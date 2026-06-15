uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.20 + vec2(t * 0.97, -t * 0.97) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.42;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 0.71, 1.43) + vec3(0.23, 0.20, 0.16);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
