uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.16 * cos(sa * 3 + t * 1.82 + ph);
    v = sin((sr - petal) * 7.48);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.09;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.32), field(p, time, 2.63));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
