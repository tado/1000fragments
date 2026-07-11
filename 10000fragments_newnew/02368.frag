uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 3.52 * sin(t * 0.45) + t * 4.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.58; p = rot2(1.76) * p; }
	p = rot2(length(p) * -1.32 + time * 0.54) * p;
	p.x += sin(p.y * 4.84 + time * 2.02) * 0.38;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.86;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.00, 0.95, 0.64) + vec3(0.17, 0.25, 0.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
