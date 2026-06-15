uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.75 * sin(mf + 3.0) + ph), cos(t * 0.75 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.80, 0.86) * sin(length(p) * 2.40 - time * 1.34) * 0.37;
	p = rot2(length(p) * 3.29 + time * 0.58) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
