uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.20 + ga * 3.0 - t * 1.63 + ph);
    v = arm * exp(-gr * 1.13);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	p = abs(p) - 0.65;
	p = rot2(length(p) * -1.72 + time * 0.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.82));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
