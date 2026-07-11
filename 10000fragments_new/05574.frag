uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.00);
    float gsh = hash21(vec2(grow, floor(t * 9.15))) - 0.5;
    float gx = p.x + gsh * 0.53;
    v = sin(gx * 11.43 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.10));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.12, 0.47, 0.50), vec3(0.76, 0.55, 0.92), d);
	col = mod(col * 2.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
