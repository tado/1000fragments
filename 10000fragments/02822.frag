uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 24.62 - t * 7.68 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 16.40 - t * 7.68 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.28;
	p = rot2(length(p) * -1.76 + time * 0.30) * p;
	p = rot2(p.y * 1.75 + time * 0.26) * p;
	p = fract(p * 2.94) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.76 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
