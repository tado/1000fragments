uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.05 * sin(mf + 3.0) + ph), cos(t * 1.05 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	p = rot2(length(p) * -2.33 + time * 1.13) * p;
	p += vec2(0.56, 0.86) * sin(length(p) * 3.13 - time * 1.72) * 0.35;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.04, 0.56), vec3(0.71, 0.71, 0.91), d);
	col = mod(col * 2.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
