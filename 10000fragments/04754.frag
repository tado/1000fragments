uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.78 + sr * 23.50 - t * 1.11 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.89 + 0.37 * sin(t * 0.63)) + vec2(-0.36, -0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = d1 * d2;
	vec3 col = palette(d * 1.50 + time * 0.30, vec3(0.55, 0.48, 0.51), vec3(0.32, 0.42, 0.34), vec3(0.80, 0.95, 1.34), vec3(0.76, 0.01, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
