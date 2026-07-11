uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.51 * sin(mf + 3.0) + ph), cos(t * 0.81 * cos(mf + 3.0) + ph));
        ms += 0.076 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	p = rot2(2.96) * p;
	p = sin(p * 2.29 + (time * 0.67) * 0.63) * 0.67;
	float d = field(p, (time * 0.67), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.52, 0.50, 0.41) + vec3(0.03, 0.03, 0.10);
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.962, 1.013) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
