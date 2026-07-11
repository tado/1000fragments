uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 28.84 - t * 1.72 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 39.27 - t * 1.72 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	p = rot2(p.y * -2.11 + time * 0.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.48 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
