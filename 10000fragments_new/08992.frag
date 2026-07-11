uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.13 * cos(sa * 9.0 + t * 0.91 + ph);
    v = sin((sr - petal) * 18.20);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.57;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
