uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.27 * cos(sa * 8 + t * 2.32 + ph);
    v = sin((sr - petal) * 10.79);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.16;
	p = abs(p) - 0.75;
	p = rot2(1.56) * p;
	p *= 1.87;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.66));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
