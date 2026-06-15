uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.38 + sr * 5.57 - t * 2.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	p += vec2(0.44, -0.53) * sin(length(p) * 2.55 - time * 1.54) * 0.33;
	p = rot2(length(p) * 3.59 + time * 1.03) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.43, 1.34, 1.07) + vec3(0.16, 0.20, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
