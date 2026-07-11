uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.04) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 1.32 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.10, vec3(0.53, 0.56, 0.42), vec3(0.37, 0.42, 0.40), vec3(0.92, 0.77, 0.87), vec3(0.44, 0.26, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
