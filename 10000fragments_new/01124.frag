uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 27.10 - t * 7.90 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 37.30 - t * 1.34 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.49 + 0.44 * sin(t * 0.60)) + vec2(-0.78, -0.11) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.28);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.15 + time * 0.21, vec3(0.49, 0.50, 0.54), vec3(0.48, 0.48, 0.44), vec3(1.21, 1.11, 0.86), vec3(0.54, 0.14, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
