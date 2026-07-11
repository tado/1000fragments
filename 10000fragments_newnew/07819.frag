uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 15.17 - t * 4.46 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 10.12 - t * 5.03 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.38, 1.40, 0.79) + vec3(0.22, 0.07, 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
