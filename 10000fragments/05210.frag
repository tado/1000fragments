uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.29 * cos(sa * 9 + t * 2.23 + ph);
    v = sin((sr - petal) * 13.14);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.16, 0.27, 0.54), vec3(0.53, 0.67, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
