uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 12.40);
    float gsh = hash21(vec2(grow, floor(t * 2.81))) - 0.5;
    float gx = p.x + gsh * 0.57;
    v = sin(gx * 19.30 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.01));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.06, 0.47) * sin(length(p) * 4.22 - time * 1.84) * 0.23;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.40, 0.38), vec3(0.94, 0.77, 0.82), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
