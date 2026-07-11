uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 22.27 - t * 5.07 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 38.16 - t * 5.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.11 + time * 0.95) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.28, 0.26), vec3(0.70, 0.95, 0.77), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
