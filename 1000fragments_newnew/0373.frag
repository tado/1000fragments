uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 19.81 - t * 6.00 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 24.98 - t * 3.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	p = rot2(0.49) * p;
	p = rot2(length(p) * 3.02 + (time * 0.68) * 0.66) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(1.20) * p; }
	p = (floor(p * 27.9) + 0.5) / 27.9;
	float d = field(p, (time * 0.68), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.46, 0.45, 0.43) + vec3(0.00, 0.06, 0.01);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.019, 1.007) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
