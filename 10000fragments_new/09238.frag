uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.77);
    float gsh = hash21(vec2(grow, floor(t * 5.00))) - 0.5;
    float gx = p.x + gsh * 0.69;
    v = sin(gx * 11.29 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.64));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p = (floor(p * 12.0) + 0.5) / 12.0;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.70, 0.72, 0.97) * (0.06 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
