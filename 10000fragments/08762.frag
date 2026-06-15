uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 33.87 - t * 5.15 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 25.79 - t * 5.15 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.16, 0.71) * sin(length(p) * 3.44 - time * 1.34) * 0.38;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.40; p = rot2(1.82) * p; }
	p = abs(p);
	p = fract(p * 1.46) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.16 + time * 0.27);
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
