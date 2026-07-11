uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.21 * cos(sa * 6.0 + t * 2.22 + ph);
    v = sin((sr - petal) * 14.16);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.62), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
