uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 13.61 - t * 1.41 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 27.68 - t * 6.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	p *= 2.77;
	p = rot2(time * -0.65) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.87 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
