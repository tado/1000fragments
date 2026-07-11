uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.18 * cos(sa * 6 + t * 0.90 + ph);
    v = sin((sr - petal) * 7.67);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.01, 0.30), vec3(0.77, 0.73, 0.75), d);
	col = mod(col * 1.84, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
