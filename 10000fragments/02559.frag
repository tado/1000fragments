uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.21 * cos(sa * 8 + t * 0.93 + ph);
    v = sin((sr - petal) * 13.45);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.51;
	p = abs(p);
	p += vec2(-0.56, -0.26) * sin(length(p) * 5.23 - time * 1.28) * 0.19;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.07, 0.22, 0.17), vec3(0.71, 0.60, 0.67), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
