uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.80 + ga * 3.0 - t * 2.09 + ph);
    v = arm * exp(-gr * 0.94);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.94) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 1.20 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.08);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.94 + time * 0.03, vec3(0.56, 0.44, 0.47), vec3(0.35, 0.41, 0.38), vec3(1.37, 0.97, 0.90), vec3(0.57, 0.76, 0.06));
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
