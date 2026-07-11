uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.46 + sr * 5.46 - t * 3.65 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	p += vec2(-0.07, -0.79) * sin(length(p) * 4.41 - time * 1.31) * 0.33;
	p = rot2(p.y * -3.54 + time * 0.63) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.64, 0.87, 1.20) + vec3(0.01, 0.11, 0.15);
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
