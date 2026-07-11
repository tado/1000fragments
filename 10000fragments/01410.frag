uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.73 - t * 7.92 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	{ p = vec2(atan(p.y, p.x) * 2.33, length(p) * 3.12 - time * 0.38); }
	p *= 1.46;
	p = rot2(length(p) * 3.61 + time * 0.27) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.04 + time * 0.01);
	col = mod(col * 2.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
