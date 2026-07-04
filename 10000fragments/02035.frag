uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.43;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 20.13 - t * 1.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.72 + 0.22 * sin(t * 0.69)) + vec2(-0.57, -0.07) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.02, vec3(0.59, 0.50, 0.46), vec3(0.44, 0.43, 0.34), vec3(0.88, 0.93, 0.97), vec3(0.12, 0.41, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
