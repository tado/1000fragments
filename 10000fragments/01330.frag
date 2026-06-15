uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 9.25 - t * 1.90 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 29.70 - t * 1.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.09, 0.21), vec3(0.58, 0.54, 0.94), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
