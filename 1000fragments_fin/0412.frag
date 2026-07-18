uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.89);
    float gsh = hash21(vec2(grow, floor(t * 4.03))) - 0.5;
    float gx = p.x + gsh * 0.89;
    v = sin(gx * 12.47 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.59));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	float d = 0.5 + 0.5 * field(p, (time * 0.70), 0.0);
	vec2 hq = rot2(1.15) * p * 15.41;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = palette(d * 0.63 + (time * 0.70) * 0.23, vec3(0.29, 0.27, 0.42), vec3(0.39, 0.40, 0.47), vec3(0.98, 0.97, 1.00), vec3(0.57, 0.79, 0.12)) * v;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.997, 0.989, 0.996);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
