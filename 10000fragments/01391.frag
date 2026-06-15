uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 29.23 - t * 6.76 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 38.48 - t * 6.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	p += vec2(0.10, 0.03) * sin(length(p) * 2.77 - time * 0.89) * 0.34;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.34; p = rot2(1.82) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.98, length(p) * 4.60 - time * 0.20); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.99 + time * 0.16);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
