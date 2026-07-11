uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.15 * cos(sa * 6 + t * 1.58 + ph);
    v = sin((sr - petal) * 8.68);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	p += vec2(0.80, 0.68) * sin(length(p) * 4.42 - time * 0.65) * 0.26;
	p = rot2(1.39) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.85));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
