uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 6.45);
    float gsh = hash21(vec2(grow, floor(t * 2.04))) - 0.5;
    float gx = p.x + gsh * 0.83;
    v = sin(gx * 12.46 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.55));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.77) * 1.14), cos((time * 0.77) * 1.04)) * 0.11;
	p.y += sin(p.x * 1.22 + (time * 0.77) * 0.69) * 0.10;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.77), 0.0);
	vec2 hq = rot2(1.26) * p * 20.38;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.90, 0.84, 0.94), vec3(0.14, 0.06, 0.18), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.959, 0.990, 0.938) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
