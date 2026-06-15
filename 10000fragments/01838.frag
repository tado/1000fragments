uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 17.35 - t * 4.68 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 35.17 - t * 4.68 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	p = rot2(p.y * 2.42 + time * 0.53) * p;
	p = fract(p * 2.62) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.00, length(p) * 4.77 - time * 0.56); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.73 + time * 0.03);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
