uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.55 + vec2(t * 0.64, -t * 1.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.21, 0.23), vec3(0.51, 0.93, 0.74), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
