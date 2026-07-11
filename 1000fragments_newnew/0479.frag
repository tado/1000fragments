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
    vec2 mc = p * (1.68 + 0.19 * sin(t * 1.29)) + vec2(-0.40, 0.11) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 21; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 21.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	float d = 0.5 + 0.5 * field(p, (time * 0.75), 0.0);
	vec2 hq = rot2(0.95) * p * 12.78;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 1.16 + (time * 0.75) * 0.03, vec3(0.50, 0.48, 0.49), vec3(0.17, 0.22, 0.20), vec3(0.85, 0.57, 0.41), vec3(0.94, 0.62, 0.37)) * v;
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.930, 0.999, 1.039) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
