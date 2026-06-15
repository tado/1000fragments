uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 18.05 - t * 1.41 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 26.94 - t * 1.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.03, -0.22) * sin(length(p) * 3.35 - time * 0.85) * 0.28;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.76 + time * 0.06);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
