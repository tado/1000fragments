uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.56;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.86) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 2.04) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	float d = 0.5 + 0.5 * field(p, (time * 0.85), 0.0);
	vec2 hq = rot2(1.12) * p * 19.51;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 1.49 + (time * 0.85) * 0.12, vec3(0.50, 0.47, 0.41), vec3(0.28, 0.26, 0.27), vec3(0.69, 0.44, 0.71), vec3(0.35, 0.59, 0.97)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.980, 0.989, 0.992) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
