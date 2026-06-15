uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.30 + 0.11 * cos(sa * 6 + t * 1.42 + ph);
    v = sin((sr - petal) * 16.33);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.68;
	p += vec2(0.68, -0.79) * sin(length(p) * 5.60 - time * 1.15) * 0.22;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.56), field(p, time, 1.12));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
