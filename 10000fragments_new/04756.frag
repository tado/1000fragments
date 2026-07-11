uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 5.02 * sin(t * 1.39) + t * 1.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.72;
	p = rot2(length(p) * -3.01 + time * 0.86) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.22; p = rot2(1.96) * p; }
	p = (floor(p * 27.3) + 0.5) / 27.3;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.84), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
