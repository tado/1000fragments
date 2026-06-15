uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.15 * sin(mf + 3.0) + ph), cos(t * 1.15 * cos(mf + 3.0) + ph));
        ms += 0.049 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	p = rot2(1.48) * p;
	p = rot2(length(p) * 1.60 + time * 1.05) * p;
	p += vec2(-0.80, 0.69) * sin(length(p) * 4.64 - time * 1.90) * 0.39;
	p = fract(p * 1.67) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.15, 0.50), vec3(0.76, 0.91, 0.84), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
