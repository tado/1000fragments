uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.17 * cos(sa * 3 + t * 1.51 + ph);
    v = sin((sr - petal) * 11.54);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 1.23, 1.29) + vec3(0.23, 0.22, 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
