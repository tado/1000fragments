uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.23 * sin(mf + 3.0) + ph), cos(t * 1.23 * cos(mf + 3.0) + ph));
        ms += 0.022 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.22) * p;
	p = abs(p) - 0.42;
	p += vec2(-0.03, -0.14) * sin(length(p) * 5.38 - time * 0.79) * 0.16;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.06, 0.57), vec3(0.71, 0.54, 0.71), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
