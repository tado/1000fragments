uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.02 + 0.21 * sin(t * 1.09)) + vec2(-0.54, -0.22) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 29; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 29.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.38, 0.0)) * 27.89 - t * 2.11 + ph);
    float mb = sin(length(p + vec2(0.38, 0.0)) * 8.63 - t * 6.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	p = fract(p * 2.87) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = d1 * d2;
	vec3 col = palette(d * 0.96 + time * 0.01, vec3(0.52, 0.46, 0.55), vec3(0.38, 0.42, 0.38), vec3(1.07, 1.23, 1.12), vec3(0.28, 0.29, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
