uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 18.48);
    float gsh = hash21(vec2(grow, floor(t * 6.32))) - 0.5;
    float gx = p.x + gsh * 0.79;
    v = sin(gx * 11.36 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.44));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.18) * p * 19.79;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.89, 0.71, 0.68), vec3(0.04, 0.11, 0.12), v);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 1.18 + time * 7.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
