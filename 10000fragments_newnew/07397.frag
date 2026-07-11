uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.25, 0.0)) * 30.29 - t * 1.74 + ph);
    float mb = sin(length(p + vec2(0.25, 0.0)) * 25.94 - t * 2.33 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	p *= 1.0 + 0.19 * sin(time * 2.90);
	p = rot2(length(p) * 1.49 + time * 0.58) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.93; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.94 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
