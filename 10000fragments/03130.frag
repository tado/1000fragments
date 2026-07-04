uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.71);
    float gsh = hash21(vec2(grow, floor(t * 7.73))) - 0.5;
    float gx = p.x + gsh * 0.74;
    v = sin(gx * 7.85 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.01));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	p *= 1.70;
	p *= 1.0 + 0.40 * sin(time * 2.14);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.21; p = rot2(1.32) * p; }
	p = rot2(time * -1.29) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.46, 0.28), vec3(0.63, 0.85, 0.54), d);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 2.29 + time * 9.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
