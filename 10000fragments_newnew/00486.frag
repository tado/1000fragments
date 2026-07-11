uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.43;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 17.60 - t * 1.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.81, 0.49) * sin(length(p) * 5.42 - time * 1.35) * 0.29;
	p = (floor(p * 11.8) + 0.5) / 11.8;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.28));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.33, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
