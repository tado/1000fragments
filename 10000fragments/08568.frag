uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.28 * cos(sa * 6 + t * 2.42 + ph);
    v = sin((sr - petal) * 19.38);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.45, 0.42), vec3(0.73, 0.64, 0.75), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
