uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.17 * sin(mf + 3.0) + ph), cos(t * 2.21 * cos(mf + 3.0) + ph));
        ms += 0.041 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.75;
	p = rot2(p.y * -2.47 + time * 0.28) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.66; }
	p = rot2(length(p) * -3.71 + time * 0.74) * p;
	p += vec2(-0.01, 0.19) * sin(length(p) * 5.17 - time * 0.92) * 0.24;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.42, 0.52), vec3(0.95, 0.62, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
