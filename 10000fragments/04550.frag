uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 34.81 - t * 3.40 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 33.41 - t * 3.40 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	p += vec2(-0.57, -0.58) * sin(length(p) * 5.58 - time * 1.62) * 0.27;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.65, lr * 2.18 + time * 0.21); }
	p = rot2(length(p) * 3.07 + time * 0.42) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.24, 0.44), vec3(0.55, 0.51, 0.87), d);
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
